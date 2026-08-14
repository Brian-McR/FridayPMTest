import app, { PORT, getApiUrl } from './server';

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API URL: ${getApiUrl()}`);
});
