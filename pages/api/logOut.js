import { DbConnection } from './DB';

export default async function handler(req, res) {
  console.log('Handler started');

  try {
    await DbConnection();
  } catch (error) {
    console.error('Error establishing database connection:', error);
    return res.status(500).json({ success: false, message: 'Failed to connect to the database' });
  }

  console.log('Database connection established');

  try {
    if (req.method === 'POST') {
      // Clear the cookie by setting it with an expired date
      res.setHeader('Set-Cookie', 'token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');
      
      // Respond with a success message
      return res.status(200).json({ success: true, message: 'User logged out successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'This method is not allowed' });
    }
  } catch (error) {
    console.error('Error logging out user:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
