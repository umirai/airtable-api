import { createAirtable } from '@/infra/airtable-client';
import { UserRepository } from '@/infra/user-repository';

const airtable = createAirtable('users');
const userRepository = new UserRepository(airtable);

(async () => {
  // 確認用
  // console.log(await userRepository.index())
  // console.log(await userRepository.findByEmail('aaa@example.com'))
  // console.log(await userRepository.insert({ username: 'suzuki-taro', email: 'taro@example.com' }))
})();
