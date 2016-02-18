class User < ActiveRecord::Base

  # refactor below
  has_secure_password

  # ensure emails are unique
  validates :email, uniqueness: true 

  # BCrypt::Engine.cost = 12

  # # email & password_digest fields must exist
  # validates :email, :password_digest, presence: true
  # # a user must have a password & password confirmation field
  # # the fields are match against each other but never persisted to the database
  # validates_confirmation_of :password
  # # TODO: add validator for unique emails

  # # to authenticate the user using bcrypt's built in 
  # def authenticate(unencrypted_password)
  #   secure_password = BCrypt::Password.new(self.password_digest)
  #   # check that a hashed version of the unencrypted password is the same as the secure password
  #   # the method `==` has been modified for `secure_password` to first hash whatever it's comparing to
  #   if secure_password == unencrypted_password
  #     # return the user
  #     self
  #   else
  #     false
  #   end
  # end

  # def password=(unencrypted_password)
  #   #raise scope of password to instance
  #   @password = unencrypted_password
  #   self.password_digest = BCrypt::Password.create(@password)
  # end

  # def password
  #   #get password, equivalent to `attr_reader :password`
  #   @password
  # end

  # has_secure_password does not give us `::confirm`

  def self.confirm(email_param, password_param)
    user = User.find_by_email(email_param)
    user.authenticate(password_param)
  end

end