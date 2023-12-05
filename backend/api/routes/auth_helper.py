def validation_errors_to_error_messages(validation_errors):
    errorMessages = {}
    # print(validation_errors)
    for field in validation_errors:
        # print(validation_errors[field])
        errorMessages[field] = validation_errors[field]
    return errorMessages
