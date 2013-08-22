set :stages, %w(production development)
set :default_stage, "production"

require 'capistrano-rbenv'
require 'bundler/capistrano'
require 'capistrano/ext/multistage'
require 'capistrano/maintenance'

load "config/recipes/base"
load "config/recipes/ssh"
load "config/recipes/nginx"
load "config/recipes/unicorn"
load "config/recipes/rbenv"
load "config/recipes/check"


set :application, "anthonys"

set :maintenance_template_path, "config/recipes/templates/maintenance.html.erb"


set :user, "cap"
set :deploy_via, :remote_cache
set :use_sudo, false
set :backup_dir, "#{deploy_to}/backups"

set :scm, "git"
set :repository, "git@github.com:JackBracken/#{application}.git"
set :branch, "master"

default_run_options[:pty] = true
ssh_options[:forward_agent] = true

after "deploy", "deploy:cleanup" # keep only the last 5 releases