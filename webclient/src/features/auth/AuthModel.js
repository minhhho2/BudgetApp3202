import { observable } from "mobx";

export default class AuthModel {
	@observable username = "";
	@observable password = "";
	@observable newPassword = "";
	@observable newPasswordConfirm = "";
}