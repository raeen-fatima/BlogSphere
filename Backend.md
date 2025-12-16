src/
  app/
    api/
      posts/
        route.js          → GET all + CREATE
      posts/
        [id]/
          route.js        → GET single + UPDATE + DELETE

  lib/
    db.js                 → Database connection

  models/
    Post.js               → Blog schema
    User.js (future)      → Auth schema
    Comment.js (future)   → Comments schema

  utils/
    errorHandler.js       → API error handler
    responses.js          → success/error response structures
    validate.js           → validations

  config/
    constants.js          → Global constants
    apiRoutes.js          → route config
