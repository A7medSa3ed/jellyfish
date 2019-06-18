class JellyfishError extends Error {
  constructor({ description, code }) {
    // Specify error text
    super(description);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JellyfishError);
    }

    // Custom debugging information
    this.code = code;
  }
}

const errors = {
  ERR_TF_DUP: questionNo =>
    new JellyfishError({
      code: "ERR_TF_DUP",
      description: `all answers for a true/false question no. ${questionNo} are the same.`
    })
};

export default errors;
