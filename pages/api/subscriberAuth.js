const verifyToken = require('../../Middleware/auth');
const Product = require('../../Models/Product')
export default async function handler(req, res) {
    console.log('req body for premium .....', req.body);
    verifyToken(req, res, async () => {
        
        try {
         
            const product = await Product.findOne({ slug:'1234578' });
            console.log('product ........',product);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

           
            if (product.isPremium) {
                console.log('product is premium')
                if (req.user.subscriptionStatus !== 'premium') {
                    return res.status(403).json({ message: 'Access denied. This product requires a premium subscription.' });
                }
            }
         
          
            res.status(200).json({
                message: 'Access granted.',
                product,
                user: req.user,
            });

        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
        // res.status(200).json({ message: 'Protected route accessed.', user: req.user });
    });
}
