export default async function handler(req, res) {
    const { code } = req.query;
  
    if (!code) {
      return res.redirect("/login");
    }
  
    res.redirect(`/api/auth/login?code=${code}`);
  }
  