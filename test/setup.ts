import { rm } from 'fs';
import { join } from 'path';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File removed successfully');
    });
  } catch (err) {}
});
