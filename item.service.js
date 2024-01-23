const itemController=require("./item.controller")


// async function getItemByBarcode(bc)
// {
//     let item =await itemController.read({barcode:bc})
// }



// Gets all products.
async function getAllItems() {
    
    const filter={}
    let items=await itemController.read(filter)
    return items;
}


// Gets all products in the fruits category.

async function getByCategory() {
    
    const filter={ category: 'fruits' }
    let items=await itemController.read(filter)
    return items;
}



// Gets all products priced below $2.30.

async function getByUnderPrice(priceToFind=2.3) {
    
    const filter={ price: { $lt: priceToFind } }
    let items=await itemController.read(filter)
    return items;
}


// Gets the product with barcode '04'.

async function getByBarcode(bc="04") {
    
    const filter={ barcode: bc }
    let items=await itemController.read(filter)
    return items;
}


// Gets all products priced between $1.50 and $1.90.

async function getByRangePrice(lowPrice=1.5, highPrice=1.9) {
    
    const filter = { price: { $gt: lowPrice, $lt: highPrice } };

    let items=await itemController.read(filter)
    return items;
}


// Gets all products with PNG images.

async function getByImagesExtension(extension="png") {
    
// The backslash `\` before the dot `.` is used to escape the dot character in the regular expression.
// Without the backslash, the dot is a special character that matches any character. 
// By using `\.` we specify that we are looking for an actual dot character in the file extension.
    const filter = { image: { $regex: `\.${extension}$`} };
    let items=await itemController.read(filter)
    return items;
}

// Gets all products containing 'berry' in the name.

async function getByIncludedString() {
    
        const filter = { name: { $regex: /berry/i } };
        let items=await itemController.read(filter)
        return items;
    }

// Gets all products with an emoji and no image.

    async function getOnlyEmojiNotImage() {

        const filter = { $and: [{ emoji:{$exists: true}}, { image: {$exists: false} }] };
        let items=await itemController.read(filter)
        return items;
    }

// Gets all products starting with the letter A.

    async function getByFirstLetter (firstLetter="A") {

        const filter = { name: { $regex: `^${firstLetter}`} };
        let items=await itemController.read(filter)
        return items;
    }


// Gets all fruits containing 'melon' or 'berry' in the name.

    async function getByIncludedTwoString () {

        const filter = {category: "fruits",  $or: [{ name: { $regex: /berry/i }}, { name: { $regex: /melon/i }}] };
        let items=await itemController.read(filter)
        return items;
    }



// Gets all products priced at or below $1.99 and not in the alcohol category.

    async function getByLteAndExcludedCategory(priceToFind=1.99) {
    

        const filter = { price: {$lte: priceToFind }, $nor:[{ category: { $regex: /alcohol/i }}]};
        let items=await itemController.read(filter)
        return items;
    }



// Gets all products priced above $2 or below $1.

    async function getByPriceGteLte(underPrice=1, overPrice=2) {

        const filter = { $or: [{ price: { $gte: overPrice}}, { price: { $lte: underPrice}}] };

        let items=await itemController.read(filter)
        return items;
    }


    
// Gets all products not in the fruits and vegetables category.

    async function getByExcludedCategories(category1="fruits", category2="vegetables") {
    

        const filter = { $nor:[{ category: { $regex:  `^${category1}` }}, { category: { $regex: `^${category2}` }}]};
        let items=await itemController.read(filter)
        return items;
    }



    //קריאה לפונקציה מסוימת, לצורך בדיקה בטרמינל
// getAllItems()


module.exports = { getByCategory, getAllItems, getByUnderPrice, getByBarcode, getByRangePrice, getByImagesExtension, getByIncludedString, getOnlyEmojiNotImage, getByFirstLetter, getByIncludedTwoString, getByLteAndExcludedCategory ,getByPriceGteLte, getByExcludedCategories};



