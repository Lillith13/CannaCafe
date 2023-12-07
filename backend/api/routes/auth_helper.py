def validation_errors_to_error_messages(validation_errors):
    errorMessages = {}
    # print(validation_errors)
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages
