require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }
  let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

  describe '#index' do
    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      it 'redners index' do
        expect(response).to render_template :index
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end  
  end

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
    context 'log in' do
      before do
        login user
      end

      context 'can save' do
        subject {
          post :create,
          params: params
        }

        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, message: nil, image: nil) } }
        subject {
          post :create,
          params: invalid_params
        }

        it 'does not count up' do
          # Messageモデルのレコード数が変化しないこと ≒ 保存に失敗したこと」を確かめる
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index' do
          # メッセージの保存に失敗した場合、indexアクションのビューをrenderするよう設定
          subject
          expect(response).to render_template :index
        end
      end
    end

    # 未login時にcreateアクションをリクエストした際は、ログイン画面へとリダイレクト。
    # redirect_toマッチャの引数に、new_user_session_pathを取り、ログイン画面へとリダイレクトしているかどうかを確かめる
    context 'not log in' do
      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
