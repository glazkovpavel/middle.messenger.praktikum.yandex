import template from './profile.hbs';
import {ProfileEditPassword} from "./profile-edit-password/profile-edit-password";
import Block from "../../utils/block";
import {Button} from '../shared/button';
import AuthController from "../../controllers/auth-controller";
import { ProfilePageEditUser} from "./profile-edit-user/profile-edit-user";
import {withUser} from '../../hoc/with-user.hoc';

export class Profile extends Block {

  public isProfileEdit: boolean = true;

  // constructor(props: IProfileState, user: IUser) {
  //   super(props, user);
  // }

   componentDidMount() {
    this.setConsole();
  }

  private setConsole(): void {
    console.log('componentDidMount')
  }

   init() {
    AuthController.fetchUser();

    this.children.profileEdit = new ProfilePageEditUser({});
    this.children.profileEditPassword = new ProfileEditPassword();
    this.children.buttonEdit = new Button({
      events: {
        click: () => this.onEditUser(),
      },
      class: 'profile__button profile__button_type_edit',
      label: 'Изменить данные',
      type: 'button'
    });

    this.children.buttonEditPassword = new Button({
      events: {
        click: () => this.onEditPassword(),
      },
      class: 'profile__button profile__button_type_edit-password',
      label: 'Изменить пароль',
      type: 'button'
    });

    this.children.buttonSave = new Button({
      events: {
        click: () => this.onSave(),
      },
      class: 'profile__button profile__button_type_save',
      id: 'name',
      label: 'Сохранить',
      type: 'submit'
    });

    this.children.buttonSignOut = new Button({
      events: {
        click: () => this.onSignOut(),
      },
      class: 'profile__button profile__button_type_signout',
      id: 'name',
      label: 'Выйти из аккаунта',
      type: 'button'
    });
  }

  private onEditUser() {
    this.setProps({
      ...this.props,
      isCanEdit: true,
    })
  }

  private onEditPassword() {
    this.setProps({
      ...this.props,
      isProfileEdit: false,
      isCanEdit: true,
    })
  }

  private onSave() {
    this.setProps({
      ...this.props,
      isProfileEdit: true,
      isCanEdit: false,
    })
  }

  private onSignOut() {
    console.log('onEditPassword');
  }

  render() {
    return this.compile(template, {...this.props});
  }

}

export const ProfilePage = withUser(Profile);
