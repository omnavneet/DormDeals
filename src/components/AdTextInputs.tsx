export type AdTexts = {
    title?: string;
    price?: string | number;
    category?: string;
    description?: string;
    contact?: string;
}

type Props = {
    defaultValues: AdTexts;
}

export default function AdTextInputs({ defaultValues }: Props) {
    return (
        <div className="">
            <label htmlFor="titleIn">Title</label>
            <input name="title" type="text" id='titleIn' placeholder="Title" defaultValue={defaultValues.title}/>

            <label htmlFor="priceIn">Price</label>
            <input name="price" type="number" id='priceIn' placeholder="Price" defaultValue={defaultValues.price}/>

            <label htmlFor="categoryIn">Category</label>
            <select name="category" id="categoryIn" defaultValue={defaultValues.category}>
                <option value="" disabled>Select Category</option>
                <option value="electronics">🤖 Electronics</option>
                <option value="books">📚 Books</option>
                <option value="clothes">👕 Clothes</option>
            </select>

            <label htmlFor="descriptionIn">Description</label>
            <textarea name="description" id="descriptionIn" placeholder="Description" defaultValue={defaultValues.description}></textarea>

            <label htmlFor="contactIn">Contact Information</label>
            <textarea name="contact" id="contactIn" placeholder="Mobile:+91 7985234212" defaultValue={defaultValues.contact}></textarea>
        </div>
    )
}