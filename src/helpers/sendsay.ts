import Sendsay from 'sendsay-api';

const sendsay = new Sendsay();
sendsay.setSessionFromCookie('sendsay_session');

export default class SendsayCustom {
	public static sendsay = sendsay;
}