export default function AdTextInputs() {
    return (
        <>
            <label htmlFor="titleIn">Title</label>
            <input name="title" type="text" id='titleIn' placeholder="Title" />

            <label htmlFor="priceIn">Price</label>
            <input name="price" type="number" id='priceIn' placeholder="Price" />

            <label htmlFor="categoryIn">Category</label>
            <select name="category" id="categoryIn">

                <option value="" disabled>Select Category</option>
                <option value="electronics">🤖 Electronics</option>
                <option value="books">📚 Books</option>
                <option value="clothes">👕 Clothes</option>
                <option value="others">Others</option>
            </select>

            <label htmlFor="descriptionIn">Description</label>
            <textarea name="description" id="descriptionIn" placeholder="Description"></textarea>

            <label htmlFor="contactIn">Contact Information</label>
            <textarea name="contact" id="contactIn" placeholder="Mobile:+91 7985234212"></textarea>
        </>
    )
}