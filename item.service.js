const itemController=require("./item.controller")


//add new item
//TODO: accese only for admin
async function addItem(newItem) {
    let newItemBarcode = newItem.barcode;
    const filter = { barcode: newItemBarcode };

    let itemExists = await itemController.readOne(filter);
    let price = newItem.price;

    if (price === undefined || price <= 0) {
        return { success: false, message: "Price should be greater than 0" };
    }
    if (!itemExists) {
        return await itemController.create(newItem);
    } else {
        return { success: false, message: "Item is already in the list" };
    }
}



//update item

//TODO: accese only for admin
//TODO: problem: update only the price

async function updateItem(id, updatedData) {
    // בדיקה אם המוצר קיים
    const filter = { _id: id };
    let itemExists = await itemController.readOne(filter);

    if (!itemExists) {
        return { success: false, message: "Item not found" };
    }

    // סינון הנתונים לפני העדכון
    const validData = validateUpdatedData(updatedData);
    if (!validData) {
        return { success: false, message: "Invalid update data" };
    }

    // עדכון המוצר עם הנתונים המסוננים
    return await itemController.updateById(filter, validData);
}



// פונקציה לווידוא וסינון הנתונים לפני העדכון
function validateUpdatedData(data) {
    // אובייקט שיכיל רק את השדות המותרים לעדכון
    let validData = {};

    // וידוא והוספה של כל שדה מותר לאובייקט החדש
    if (data.image) validData.image = data.image;
    if (data.category) validData.category = data.category;
    if (data.price && data.price > 0) validData.price = data.price;

    // אם אין שדות לעדכון, תחזיר null או הודעת שגיאה
    return Object.keys(validData).length ? validData : null;
}



// Gets all products in the category.

async function getByCategory(cat) {
    
    const filter={ category: cat }
    const items = await itemController.read(filter);
    if (items.length === 0) {
        return { success: false, message: "Cetegory not found" };
    }
    return items;
}
















// Gets the product by ID

async function getItemById(id) {
    
    const filter={ _id: id }
    let item=await itemController.readOne(filter)
    return item;
}



// Gets all products.
async function getAllItems() {
    
    const filter={}
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


module.exports = {addItem,updateItem,getItemById, getByCategory, getAllItems, getByUnderPrice, getByBarcode, getByRangePrice, getByImagesExtension, getByIncludedString, getOnlyEmojiNotImage, getByFirstLetter, getByIncludedTwoString, getByLteAndExcludedCategory ,getByPriceGteLte, getByExcludedCategories};



