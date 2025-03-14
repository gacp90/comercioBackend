const fs = require('fs');

// MODELS
const Product = require('../models/products.model');
const User = require('../models/users.model');
const Category = require('../models/category.model');
const Empresa = require('../models/empresa.model');

/** =====================================================================
 *  DELETE IMAGE
=========================================================================*/
const deleteImage = (path) => {

    // VALIDATE IMAGE
    if (fs.existsSync(path)) {
        // DELET IMAGE OLD
        fs.unlinkSync(path);
    }

};

/** =====================================================================
 *  DELETE IMAGE
=========================================================================*/


/** =====================================================================
 *  UPDATE IMAGE 
=========================================================================*/
const updateImage = async(tipo, id, nameFile, desc) => {

    let pathOld = '';

    switch (tipo) {
        case 'products':

            const product = await Product.findById(id);
            if (!product) {
                return false;
            }

            product.img.push({
                img: nameFile,
                fecha: new Date(Date.now())
            })

            await product.save();
            return true;



            // BREAK PRODUCT
            break;

        case 'user':

            // SEARCH USER BY ID
            const user = await User.findById(id);
            if (!user) {
                return false;
            }

            // VALIDATE IMAGE
            pathOld = `./uploads/user/${ user.img }`;
            deleteImage(pathOld);

            // SAVE IMAGE
            user.img = nameFile;
            await user.save();
            return true;

            break;
        case 'category':

            // SEARCH USER BY ID
            const category = await Category.findById(id);
            if (!category) {
                return false;
            }

            // VALIDATE IMAGE
            pathOld = `./uploads/category/${ category.icon }`;
            deleteImage(pathOld);

            // SAVE IMAGE
            user.icon = nameFile;
            await category.save();
            return true;

            break;

        case 'logo':

            // SEARCH USER BY ID
            const empresa = await Empresa.findById(id);
            if (!empresa) {
                return false;
            }

            if (desc === 'logo') {

                // VALIDATE IMAGE
                pathOld = `./uploads/logo/${ empresa.logo }`;
                deleteImage(pathOld);

                // SAVE IMAGE
                empresa.logo = nameFile;
                await empresa.save();
                return true;
                
            }else if(desc === 'logob'){

                // VALIDATE IMAGE
                pathOld = `./uploads/logo/${ empresa.logob }`;
                deleteImage(pathOld);

                // SAVE IMAGE
                empresa.logob = nameFile;
                await empresa.save();
                return true;

            }else if(desc === 'ico'){
                // VALIDATE IMAGE
                pathOld = `./uploads/logo/${ empresa.ico }`;
                deleteImage(pathOld);

                // SAVE IMAGE
                empresa.ico = nameFile;
                await empresa.save();
                return true;
            }else{
                return;
            }   

            break;

        

        default:
            break;
    }


};
/** =====================================================================
 *  UPDATE IMAGE
=========================================================================*/




// EXPORT
module.exports = {
    updateImage
};