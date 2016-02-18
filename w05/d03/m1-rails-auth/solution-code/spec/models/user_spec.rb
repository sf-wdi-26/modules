require "rails_helper"

describe User, type: :model do
  it "can create a new user" do
    expect(User.new).to be_a User
  end

  context 'Initialization' do
    let(:user) { User.new }

    it "allows the getting of a password" do
      expect(user).to respond_to(:password)
    end

    it "allows the setting of a password" do
      expect(user).to respond_to(:password=).with(1).argument
    end

    it "creates a password digest when a password has been set" do
      #password digest starts as nil
      expect(user.password_digest).to be_nil
      #password is set
      user.password = "swordfish"
      #password digest is created after passsword is set
      expect(user.password_digest).not_to be_nil
    end
    it "ensures the password digest is not the password" do
      user.password = "swordfish"
      expect(user.password_digest).not_to eq(user.password)
    end
  end

  context 'Validation' do
    let(:user) do
      #create a user in active memory
      User.new({
        email: "bana@na.com",
        password: "adsf1234",
        password_confirmation: "adsf1234"
      })
    end
    it "validates presence of password_digest" do
      #clear values of password & password_confirmation
      user.password_digest = nil
      expect(user).not_to be_valid
    end

    it "validates presence of email" do
      #clear values of email
      user.email = nil
      expect(user).not_to be_valid
    end

    it "validates password & password confirmation match" do
      user.password_confirmation = "not the same"
      expect(user).not_to be_valid
    end
  end

  context 'Authentication' do
    before(:all) do
      #clear all users
      User.destroy_all
      #save a user to the database
      @user = User.create({
        email: "shmee@me.com",
        password: "jumanji",
        password_confirmation: "jumanji"
      })
    end
    it "restricts passwords from saving to the db" do
      found_user = User.all.first
      expect(found_user.password).to eq(nil)
    end

    describe "#authenticate" do
      it "returns the user when the correct password is provided" do
        expect(@user.authenticate("jumanji")).to eq(@user)
      end

      it "returns false when an incorrect password is provided" do
        expect(@user.authenticate("ijnamuj")).to eq(false)
      end
    end

    describe "::confirm" do
      it "checks if a specified user & password combination exists" do
        user_email = "shmee@me.com"
        user_password = "jumanji"
        found_user = User.find_by_email(user_email)
        expect(User.confirm(user_email, user_password)).to eq(found_user.authenticate(user_password))
      end
    end
  end
end
