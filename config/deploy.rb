require 'bundler/capistrano'
 
set :application, "anthonys"
set :repository,  "git@github.com:JackBracken/anthonys.git"
 
set :scm, :git
 
set :default_environment, {
  'PATH' => "$HOME/.rbenv/shims:$HOME/.rbenv/bin:$PATH"
}
 
set :use_sudo, false
 
default_run_options[:pty] = true
 
set :user, "jack"
set :group, user
set :runner, user
 
set :host, "#{user}@jackbracken.me"
role :web, host
role :app, host
 
set :rack_env, :production
 
set :deploy_to, "/srv/#{application}"
set :unicorn_conf, "#{current_path}/config/unicorn.rb"
set :unicorn_pid, "#{shared_path}/pids/unicorn.pid"
 
set :public_children, ["css","img","js"]
 
namespace :deploy do
 
  task :restart do
    run "if [ -f #{unicorn_pid} ]; then kill -USR2 `cat #{unicorn_pid}`; else cd #{current_path} && bundle exec unicorn -c #{unicorn_conf} -E #{rack_env} -D; fi"
  end
 
  task :start do
    run "cd #{current_path} && bundle exec unicorn -c #{unicorn_conf} -E #{rack_env} -D"
  end
 
  task :stop do
    run "if [ -f #{unicorn_pid} ]; then kill -QUIT `cat #{unicorn_pid}`; fi"
  end
 
end

# require 'rvm/capistrano'
# set :rvm_ruby_string, '1.9.3'
# set :rvm_type, :user

# # Bundler tasks
# require 'bundler/capistrano'

# set :domain,      "stanthonysrosslare.com"
# set :application, "anthonys"

# set :scm, :git
# set :repository,  "git@github.com:JackBracken/anthonys.git"

# # do not use sudo
# set :user, "jack"
# set :use_sudo, false
# set(:run_method) { use_sudo ? :sudo : :run }

# # This is needed to correctly handle sudo password prompt
# default_run_options[:pty] = true

# set :group, user
# set :runner, user

# set :host, "#{user}@jackbracken.me" # We need to be able to SSH to that box as this user.
# role :web, host
# role :app, host

# set :rails_env, :production

# # Where will it be located on a server?
# set :deploy_to, "/home/jack/#{application}"
# set :unicorn_conf, "#{deploy_to}/current/config/unicorn.rb"
# set :unicorn_pid, "#{deploy_to}/shared/pids/unicorn.pid"

# # Unicorn control tasks
# namespace :deploy do
#   task :restart do
#     run "if [ -f #{unicorn_pid} ]; then kill -USR2 `cat #{unicorn_pid}`; else cd #{deploy_to}/current && bundle exec unicorn -c #{unicorn_conf} -E #{rails_env} -D; fi"
#   end
#   task :start do
#     run "cd #{deploy_to}/current && bundle exec unicorn -c #{unicorn_conf} -E #{rails_env} -D"
#   end
#   task :stop do
#     run "if [ -f #{unicorn_pid} ]; then kill -QUIT `cat #{unicorn_pid}`; fi"
#   end
# end