namespace :nginx do
  desc "Install latest stable release of nginx."
  task :install, roles: :web do
    run "#{sudo} apt-get -y update"
    run "#{sudo} apt-get -y install nginx"
  end
  after "deploy:install", "nginx:install"

  desc "Setup nginx configuration for this stage_domain."
  # task :setup, roles: :web do
  #   template "nginx_unicorn.erb", "/tmp/nginx_conf"
  #   run "#{sudo} mkdir -p /etc/nginx/ssl"
  #   run "#{sudo} mv /tmp/nginx_conf /etc/nginx/sites-enabled/#{stage_domain}"
  #   run "#{sudo} rm -f /etc/nginx/sites-enabled/default"
  #   run "#{sudo} openssl req -x509 -newkey rsa:2048 -keyout /etc/nginx/ssl/#{stage_domain}.key -out /etc/nginx/ssl/#{stage_domain}.crt -days 9999 -nodes -subj \"/C=IE/ST=Ireland/L=Dublin/O=#{stage_domain}/OU=IT/CN=wooq\""
  #   restart
  # end

  %w[start stop restart].each do |command|
    desc "#{command} nginx."
    task command, roles: :web do
      run "#{sudo} service nginx #{command}"
    end
  end
end