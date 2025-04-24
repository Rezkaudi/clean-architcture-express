export const StatusCodes = {
    CREATED: 201,
    OK: 200,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
};

export const Messages = {
    // auth
    REGISTER_SUCCESS: "User registered successfully. Please check your email for verification.",
    INTERNAL_ERROR: "An unexpected error occurred",
    LOGIN_SUCCESS: "Login successful",
    LOGOUT_SUCCESS: "Logged out successfully",
    VERIFY_SUCCESS: "Verification Email Successfull",
    RESET_PASSWORD_SUCCESS: "Password reset successfully. You can now log in with your new password.",
    FORGOT_PASSWORD_SUCCESS: "Password reset email sent. Please check your inbox.",
    REFRESH_TOKEN_SUCCESS: "Token refreshed successfully",
    RESEND_VERIFICATION_SUCCESS: "Please check your email for verification.",

    // user
    GET_USER_INFO_SUCCESS: "Successful Get User Info",
    UPDATE_USER_INFO_SUCCESS: "Successful Update User Info",
    DELETE_USER_ACCOUNT_SUCCESS: "Account deleted and session cleared.",

    // pathway
    CREATE_PATHWAY_SUCCESS: "Pathway Created successfully",
    DELETE_PATHWAY_SUCCESS: "Pathway Deleted successfully",
    GET_PATHWAYS_SUCCESS: "Pathways retrieved successfully",
    GET_PATHWAY_SUCCESS: "Pathway retrieved successfully",
    UPDATE_PATHWAY_SUCCESS: "Pathway Updated successfully"
};