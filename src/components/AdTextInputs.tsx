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
            <input name="title" type="text" id='titleIn' placeholder="Title" defaultValue={defaultValues.title} className="mb-5 border-[1px] border-black"/>

            <label htmlFor="priceIn">Price</label>
            <input name="price" type="number" id='priceIn' placeholder="Price" defaultValue={defaultValues.price} className="mb-5 border-[1px] border-black"/>

            <label htmlFor="categoryIn">Category</label>
            <select name="category" id="categoryIn"  defaultValue={defaultValues.category || "select"} className="mb-5 border-[1px] border-black">
                <option value="select" disabled>Select Category</option>
                <option value="electronics">🤖 Electronics</option>
                <option value="books">📚 Books</option>
                <option value="clothes">👕 Clothes</option>
            </select>

            <label htmlFor="descriptionIn">Description</label>
            <textarea name="description" id="descriptionIn" placeholder="Description" defaultValue={defaultValues.description} className="mb-5 border-[1px] border-black pb-12"></textarea>

            <label htmlFor="contactIn">Contact Information</label>
            <textarea name="contact" id="contactIn" placeholder="Mobile:+91 7985234212" defaultValue={defaultValues.contact} className="mb-5 border-[1px] border-black"></textarea>
        </div>
    )
}