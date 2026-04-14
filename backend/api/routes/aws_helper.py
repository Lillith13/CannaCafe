import boto3
from botocore.exceptions import ClientError, NoCredentialsError
import os
import uuid

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}


def get_s3_bucket_name():
    bucket_name = os.environ.get("S3_BUCKET")
    if not bucket_name:
        raise RuntimeError("Missing required environment variable: S3_BUCKET")
    return bucket_name


def get_s3_client():
    access_key = os.environ.get("S3_KEY")
    secret_key = os.environ.get("S3_SECRET")
    region = os.environ.get("S3_REGION")

    if not access_key or not secret_key:
        raise RuntimeError("Missing required AWS credentials: S3_KEY and S3_SECRET")

    client_kwargs = {
        "aws_access_key_id": access_key,
        "aws_secret_access_key": secret_key,
    }
    if region:
        client_kwargs["region_name"] = region

    return boto3.client("s3", **client_kwargs)


def get_s3_location():
    bucket_name = get_s3_bucket_name()
    return f"https://{bucket_name}.s3.amazonaws.com/"


def allowed_file(filename):
    if not filename or "." not in filename:
        return False
    ext = filename.rsplit(".", 1)[1].lower()
    return ext in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    if not filename or "." not in filename:
        raise ValueError("Invalid filename provided")
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    if not file or not getattr(file, "filename", None):
        return {"errors": "No file provided for upload"}

    if not allowed_file(file.filename):
        return {"errors": "File type is not allowed"}

    try:
        file.seek(0)
    except Exception:
        pass

    try:
        s3 = get_s3_client()
        s3.upload_fileobj(
            file,
            get_s3_bucket_name(),
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": getattr(file, "content_type", "application/octet-stream")
            }
        )
    except (NoCredentialsError, ClientError, RuntimeError) as e:
        return {"errors": str(e)}
    except Exception as e:
        return {"errors": str(e)}

    return {"url": f"{get_s3_location()}{file.filename}"}


def remove_file_from_s3(image_url):
    if not image_url or image_url in {"undefined", "null"}:
        return True

    if "/" not in image_url:
        return {"errors": "Invalid image URL"}

    key = image_url.rsplit("/", 1)[1]

    try:
        s3 = get_s3_client()
        s3.delete_object(
            Bucket=get_s3_bucket_name(),
            Key=key
        )
    except (NoCredentialsError, ClientError, RuntimeError) as e:
        return {"errors": str(e)}
    except Exception as e:
        return {"errors": str(e)}

    return True
