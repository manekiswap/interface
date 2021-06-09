import caller from './caller';

class _SubsribeService {
  async subscribe(email: string) {
    const data = new FormData();
    data.append('email', email);

    try {
      await caller.sharedInstance.request({
        method: 'POST',
        url: '/emailSubscribe',
        data,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new _SubsribeService();
