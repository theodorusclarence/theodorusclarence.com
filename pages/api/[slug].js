import { checkSlugExist, createSlugView, getViewBySlug, updateView } from '../../utils/Fauna';

export default async function handler(req, res) {
    const { slug } = req.query;
    if (!(await checkSlugExist(slug))) {
        await createSlugView(slug);
        console.log(slug);
    }

    const document = await getViewBySlug(slug);

    if (req.method === 'GET') {
        return res.status(200).json(document.data);
    }
    if (req.method === 'POST') {
        const updated = await updateView(document.ref, {
            ...document.data,
            count: document.data.count + 1,
        });

        return res.status(200).json(updated);
    }
}
