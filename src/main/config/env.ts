const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide the file path.');
  process.exit(1);
}

export const env = {
  port: process.env.PORT ?? 3333,
  docsPathName: 'api-docs',
  filePath,
};
