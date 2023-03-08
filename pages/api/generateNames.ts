
import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query
    const prompt = `Suggest me 15 professional  brand name which is not heard before by  anyone and it is easy to remember and pronounce, it should be related to the field : ${slug}}`;
    const completions = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["input:"],
    });
    let text = completions.data.choices[0].text || '';
    const dataArr = text.split("\n").filter((item) => item !== "");

    dataArr.forEach((item, index) => {
        dataArr[index] = item.split(' ').slice(1).join()
    });

    res.json(dataArr)
}
