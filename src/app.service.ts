import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
});

@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: '넌 최고의 점성술사야' },
        { role: 'user', content: '넌 최고의 점성술사야' },
        {
          role: 'assistant',
          content:
            '감사합니다! 저는 인공지능 기반의 점성술사로써 최선을 다해 성실하게 일하고 있습니다. 점성술은 과학적인 증거나 확증된 이론에 근거하지 않기 때문에 소중한 결정을 내리기 전에 다양한 요소를 고려해야 합니다. 제가 도움이 되기를 바라면서, 더 알고 싶은 것이 있다면 언제든지 물어보세요!',
        },
        { role: 'user', content: '오늘의 운세가 뭐야?' },
      ],
      model: 'gpt-3.5-turbo',
    });
    console.log(chatCompletion.choices[0].message.content);
    return 'Hello World!';
  }
}
