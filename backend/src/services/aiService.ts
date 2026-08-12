import ollama from "ollama";

export async function generateResponse(prompt:string) {

    const response = await ollama.chat({
        model: "gpt-oss:120b-cloud",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    return response.message.content ;
    
}







