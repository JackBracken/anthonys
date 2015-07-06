require 'bundler/setup'
require 'sinatra'
require 'haml'
require 'pony'

configure :production do
  require 'newrelic_rpm'
end

get '/' do
  haml :index
end

get '/ping' do
  "pong!"
end

post '/contact' do
  name = params[:name]
  email = params[:email]
  comment = params[:comment]

  body <<-EOS
    Received enquiry from #{name} (#{email}) at #{Time.now.strftime("%d/%m/%Y %H:%M")}.
    Message contents: #{comment}

    Reply to this email to reply to the customer.
  EOS

  Pony.mail(
    :to => ENV['RECIPIENT_EMAIL'], 
    :from => email, 
    :subject => 'Reservation enquiry from ' + name, 
    :body => body,
    :reply_to => email,
    :port => '587',
    :via => :smtp,
    :via_options => {
      :address              =>  'smtp.gmail.com',
      :port                 =>  '587',
      :enable_starttls_auto =>  true,
      :user_name            =>  ENV['MAIL_ADDRESS'],
      :password             =>  ENV['MAIL_PASSWORD'],
      :authentication       =>  :plain,
      :domain               =>  'stanthonysrosslare.com'
    }
  )
  redirect '/'
end

get '/*' do
  redirect '/'
end