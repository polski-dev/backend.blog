module.exports = ({ env }) => ({
  // UPLOAD
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: env("AWS_ACCESS_KEY_ID"),
        secretAccessKey: env("AWS_ACCESS_SECRET"),
        region: env("AWS_REGION"),
        params: {
          Bucket: env("AWS_BUCKET"),
        },
      },
    },
  },
  // MAIL
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "hello@uxu.pl",
        defaultReplyTo: "hello@uxu.pl",
        testAddress: "hello@uxu.pl",
      },
    },
  },
  // GRAPHQL
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 20,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },

  comments: {
    enabled: true,
    config: {
      badWords: false,
      moderatorRoles: ["Authenticated"],
      approvalFlow: ["api::posts.posts"],
      entryLabel: {
        "*": ["Title", "title", "Name", "name", "Subject", "subject", "cover", "avatar"],
      },
      reportReasons: {
        // ..
      },
      gql: {
        auth: true,
      },
    },
  },
});
