server 'jacktrick.com', :app, :web, :primary => true

set :environment, 'production'
set(:stage_domain) {'stanthonysrosslare.com'}
set(:deploy_to) { "/var/www/#{stage_domain}" }