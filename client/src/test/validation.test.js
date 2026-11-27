import { describe, expect, it } from 'vitest';
import { validateContact } from '../lib/validation.js';

const valid = { name: 'Олена', email: 'olena@example.com', phone: '+380671234567', message: 'Хочу дізнатися про збір.', consent: true };

describe('validateContact', () => {
  it('приймає коректно заповнену форму', () => expect(validateContact(valid)).toEqual({}));
  it('вимагає ім’я щонайменше з двох символів', () => expect(validateContact({ ...valid, name: 'А' })).toHaveProperty('name'));
  it('перевіряє формат email', () => expect(validateContact({ ...valid, email: 'wrong' })).toHaveProperty('email'));
  it('перевіряє український номер телефону', () => expect(validateContact({ ...valid, phone: '0671234567' })).toHaveProperty('phone'));
  it('вимагає змістовне повідомлення', () => expect(validateContact({ ...valid, message: 'Привіт' })).toHaveProperty('message'));
  it('вимагає згоду на обробку звернення', () => expect(validateContact({ ...valid, consent: false })).toHaveProperty('consent'));
});
