import caller from './caller';

class _SubsribeService {
  async subscribe(email: string) {
    const data = new FormData();
    data.append('email', email);
    await caller.sharedInstance.request({
      method: 'POST',
      url: '/emailSubscribe',
      data,
    });
  }
}

export default new _SubsribeService();
