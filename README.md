# Escalations Engineer (SmokeJumper) Homework Assignment

## Part 1: Database Queries

### Prerequisites
1. Have [Docker](https://docs.docker.com/get-docker/) installed on your system
2. Install the [MongoDB CLI](https://docs.mongodb.com/mongocli/master/install/)

### Setup Steps
1. Change directory to the workspace for your local Mongo DB
```
cd /jumpcloud-escalations-engineer-assignment/mongodb
```
2. Pull down mongo community image
```
docker pull mongo
```
3. Replace the path specified under volumes in the provided docker-compose.yml file to the path to the mongodb directory
4. Start the mongo service
```
docker-compose up -d
```
5. Get the container id for the new mongo container
```
docker ps
```
6. Copy the provided `.json` files to the docker container
```
docker cp employees.json {CONTAINER_ID}:/
docker cp beers.json {CONTAINER_ID}:/
docker cp patrons.json {CONTAINER_ID}:/
```
7. Connect to the mongo docker container
```
docker exec -it jcmongo bash
```
8. Import the database backups
```
mongoimport --db=brewery --collection=beers --file=beers.json
mongoimport --db=brewery --collection=employees --file=employees.json
mongoimport --db=brewery --collection=patrons --file=patrons.json
```
9. Either close connection to docker container or open a new terminal and ensure database is accessible by running:
```
mongo mongodb://127.0.0.1:27017/brewery
```

### Assignment
1. Create and provide a script with logging to achieve each of the following:
  - We’re coming out with a new hoppy delicious IPA. To let our customers know, we need two mailing lists.
    - One that includes the email addresses of all of our customers
    
    `mongo scripts/mailing_list.js`

    Output:
    ```
      [
        "kmarks@notarealemail.com",
        "kmarks@notarealemail.com",
        "jpatterson@notarealemail.com",
        "aleon@notarealemail.com",
        "kmccann@notarealemail.com",
        "bkaiser@notarealemail.com",
        "scombs@notarealemail.com",
        "nrocha@notarealemail.com",
        "sstuart@notarealemail.com",
        "xnovak@notarealemail.com",
        "iwise@notarealemail.com",
        "dcowan@notarealemail.com",
        "mkey@notarealemail.com",
        "jbutler@notarealemail.com",
        "lsanchez@notarealemail.com",
        "thanna@notarealemail.com",
        "ybowen@notarealemail.com",
        "mwaters@notarealemail.com",
        "kburgess@notarealemail.com",
        "thaynes@notarealemail.com",
        "mhayden@notarealemail.com",
        "tbradshaw@notarealemail.com",
        "bwaller@notarealemail.com",
        "kcobb@notarealemail.com",
        "jchung@notarealemail.com",
        "sryan@notarealemail.com",
        "jolsen@notarealemail.com",
        "jholloway@notarealemail.com",
        "kbaldwin@notarealemail.com",
        "pward@notarealemail.com",
        "lyu@notarealemail.com",
        "icox@notarealemail.com",
        "sbraun@notarealemail.com",
        "ntanner@notarealemail.com",
        "rmoses@notarealemail.com",
        "adougherty@notarealemail.com",
        "layala@notarealemail.com",
        "kmurphy@notarealemail.com",
        "dvargas@notarealemail.com",
        "mwebb@notarealemail.com",
        "sjefferson@notarealemail.com",
        "hhuynh@notarealemail.com",
        "tcallahan@notarealemail.com",
        "psandoval@notarealemail.com",
        "mhanson@notarealemail.com",
        "smoss@notarealemail.com",
        "npena@notarealemail.com",
        "jevans@notarealemail.com",
        "gwoods@notarealemail.com",
        "jfrancis@notarealemail.com",
        "eduarte@notarealemail.com",
        "kgibbs@notarealemail.com",
        "kday@notarealemail.com",
        "evaldez@notarealemail.com",
        ...
      ]
    ```
    - Another that includes only the email addresses for customers whose favorite beer is an IPA.

    `mongo brewery --eval "var beerType='<BEER_TYPE>'" scripts/mailing_list.js`

    The mailing list script takes an optional paramenter `beerType` if a trying to only return emails of customers with that beer type listed as their favorite. If the `beerType` parameter is ommitted the query will default to returning a mailing list of all customer emails.

    Output:
    ```
      [
        "kcobb@notarealemail.com",
        "jchung@notarealemail.com",
        "sryan@notarealemail.com",
        "jholloway@notarealemail.com",
        "mwebb@notarealemail.com",
        "oschmitt@notarealemail.com",
        "egallegos@notarealemail.com",
        "sleonard@notarealemail.com",
        "jwarner@notarealemail.com",
        "ksimmons@notarealemail.com",
        "akemp@notarealemail.com",
        "cboone@notarealemail.com",
        "ahuber@notarealemail.com",
        "dbell@notarealemail.com",
        "ecabrera@notarealemail.com",
        "sstone@notarealemail.com",
        "kconley@notarealemail.com",
        "cproctor@notarealemail.com",
        "lfarley@notarealemail.com",
        "kjoyce@notarealemail.com",
        "egoodman@notarealemail.com",
        "qkent@notarealemail.com",
        "aedwards@notarealemail.com",
        "gbenson@notarealemail.com",
        "abriggs@notarealemail.com",
        "llindsey@notarealemail.com",
        "elucero@notarealemail.com",
        "edowns@notarealemail.com",
        "mchapman@notarealemail.com",
        "jmccann@notarealemail.com",
        "jsloan@notarealemail.com",
        "jvillegas@notarealemail.com",
        "gbarton@notarealemail.com"
      ]
    ```
  - We need to gather some data on our tap rooms to show which is the most popular location. We need to know how many customers have frequented each location between 1/1/2021 - 4/1/2021.
    
    `mongo scripts/taproom_visits.js`

    This script can be run with default dates of 1/1/2021 - 4/1/2021 using the above command. However, if a start date and end date would like to be customized the below command can be run with two parameters: `startDate` and `endDate`.

    `mongo brewery --eval "var startDate='<YYYY-MM-DD>'; var endDate='<YYYY-MM-DD>'" scripts/taproom_visits.js`

    Output:
    ```
      [
        {
          "visits" : 12,
          "location" : "123 Fake Street, Denver, CO"
        },
        {
          "visits" : 8,
          "location" : "987 Fake Blvd, Boulder, CO"
        }
      ]
    ```
  - We’re trying to determine what type of beer is most popular with our customers so we can determine what our next experimental beer should be! Can you provide us with an array of objects that include the beer name, type, and number of customers where that beer is their favorite?

  `mongo scripts/beers_by_popularity.js`

  Output:
  ```
    [
      {
        "count" : 115,
        "type" : "Hazy IPA",
        "name" : "Super Haze"
      },
      {
        "count" : 34,
        "type" : "Stout",
        "name" : "Down N Out Stout"
      },
      {
        "count" : 34,
        "type" : "Pilsner",
        "name" : "Peruvian Pils"
      },
      {
        "count" : 33,
        "type" : "IPA",
        "name" : "Musical Mosaic"
      },
      {
        "count" : 30,
        "type" : "Kolsch",
        "name" : "Kasual Kolsch"
      },
      {
        "count" : 20,
        "type" : "Dunkelweizen",
        "name" : "Slam Dunk"
      },
      {
        "count" : 19,
        "type" : "Lager",
        "name" : "Leisurely Lager"
      },
      {
        "count" : 16,
        "type" : "Hefeweizen",
        "name" : "El Jefe"
      }
    ]
  ```
2. Provide the output results for each of these requests.

## Part 2: Interacting with JumpCloud

### Prerequisites
1. Create a free JumpCloud Organization: https://console.jumpcloud.com/signup
2. Install the JumpCloud Agent on a system (Mac, Windows, or Linux)

### Assignment
1. Using the programming language of your choice (Go or JavaScript preferred), complete the following and provide your solution for each:
  
    __Using Ruby v2.6.3__

   - Create and activate 2 Users
      ```
      require 'faraday'
      require 'json'
      require './api_connections.rb'

      def create_user(username, email, firstname, lastname)
          response = api_v1_conn.post('systemusers') do |req|
              req.body = {
                  'username': username,
                  'email': email,
                  'firstname': firstname,
                  'lastname': lastname
              }.to_json
          end
          puts "Status: #{response.status}"
          puts response.body
      end

      create_user('dylanbabaloo', 'dbabaloo@yopmail.com', 'Dylan', 'Babaloo')
      create_user('joeboe', 'jboe@yopmail.com', 'Joe', 'Boe')
      ```
   - Create a Group of Users
   ```
    require 'faraday'
    require 'json'
    require './api-connections.rb'

    def create_user_group(group_name)
        response = api_v2_conn.post('usergroups') do |req|
            req.body = {
                'name': group_name
            }.to_json
        end
        puts "Status: #{response.status}"
        puts response.body
    end

    create_user_group("Normal Users")
   ```
   - Associate Users to the Group of Users
    ```
      require 'faraday'
      require 'json'
      require './api_connections.rb'

      def add_user_to_group(group_id, user_id)
          response = api_v2_conn.post("usergroups/#{group_id}/members") do |req|
              req.body = {
                  'op': "add",
                  'type': "user",
                  'id': user_id
              }.to_json
          end
          puts "Status: #{response.status}"
          puts response.body
      end

      add_user_to_group("60956c8c232e11684f80ee08", "60956a3389605214a023e391")
      add_user_to_group("60956c8c232e11684f80ee08", "60956a348fe9c62e3674e7fb")
    ```
   - Associate one User to the recently added system in JumpCloud
   ```
    require 'faraday'
    require 'json'
    require './api_connections.rb'

    def get_systems
        response = api_v1_conn.get("systems") 
        
        puts "Status: #{response.status}"
        puts response.body

        JSON.parse(response.body)
    end

    def associate_user_to_system(system_id, user_id)
        response = api_v2_conn.post("systems/#{system_id}/associations") do |req|
            req.body = {
                'id': user_id,
                'op': "add",
                "type": "user"
            }.to_json
        end

        puts "Status: #{response.status}"
        puts response.body
    end

    system_id = get_systems["results"].first["id"]

    associate_user_to_system(system_id, "60956a3389605214a023e391")
   ```

2. Log in to the system as the JumpCloud managed user

3. Set agent logs to DEBUG on system and provide a copy of agent logs
  ```
  021/05/07 09:25:09 [32713] [INFO] enabling memory profiling on SIGUSR1
2021/05/07 09:25:09 [32713] [INFO] ---------------------
2021/05/07 09:25:09 [32713] [INFO] Starting agent daemon
2021/05/07 09:25:09 [32713] [INFO] ---------------------
2021/05/07 09:25:09 [32713] [INFO] Build version: 0.154.0
2021/05/07 09:25:09 [32713] [INFO] Build date: Mon May  3 23:23:35 UTC 2021
2021/05/07 09:25:09 [32713] [INFO] Loading conf from jcagent.conf
2021/05/07 09:25:09 [32713] [INFO] Could not load registration attempts counter. Assuming this is the first attempt and not applying backoff
2021/05/07 09:25:09 [32713] [INFO] Certificate read failed, err='Could not read the client certificate PEM file 'client.crt', err='Could not read PEM file, err='open client.crt: no such file or directory'''
2021/05/07 09:25:09 [32713] [INFO] REGISTRATION: No existing valid certificate found, initializing it
2021/05/07 09:25:09 [32713] [INFO] REGISTRATION: Creating client certificates
2021/05/07 09:25:10 [32713] [INFO] REGISTRATION: Client certificates created and signed successfully
2021/05/07 09:25:10 [32713] [INFO] REGISTRATION: Registering new system
2021/05/07 09:25:10 [32713] [INFO] systemreport.reporter: running system report
2021/05/07 09:25:10 [32713] [ERROR] systemreport.reporter: error collecting data: Get "": unsupported protocol scheme ""
2021/05/07 09:25:11 [32713] [INFO] No Service Account keychain exists, will attempt to retrieve password from the passwordfile
2021/05/07 09:25:12 [32713] [INFO] Necessary structs are nil. Will not attempt to get ServiceAccount data
2021/05/07 09:25:12 [32713] [INFO] REGISTRATION: System registration completed successfully
2021/05/07 09:25:12 [32713] [INFO] REGISTRATION: Successfully created certificate and completed registration.
2021/05/07 09:25:12 [32713] [INFO] system OS info: Mac OS X 10.14.5
2021/05/07 09:25:12 [32713] [INFO] using new path construction method
2021/05/07 09:25:12 [32713] [INFO] Using migrations path of file:///opt/jc//migrations
2021/05/07 09:25:12 [32713] [INFO] HTTP client successfully initialized its TLS config.
2021/05/07 09:25:12 [32713] [INFO] Database has no existing version. Migrating to version 10
2021/05/07 09:25:12 [32713] [INFO] Migrating database from version 0 to 10
2021/05/07 09:25:12 [32713] [INFO] No zero touch username found: exit status 1
2021/05/07 09:25:12 [32713] [INFO] MD5SumMonitor Init
2021/05/07 09:25:12 [32713] [INFO] MD5SumMonitor Init complete
2021/05/07 09:25:12 [32713] [INFO] Agent Init - systemKey='60955bd85391761889143a21'
2021/05/07 09:25:12 [32713] [INFO] WorkflowManager Init
2021/05/07 09:25:12 [32713] [INFO] WorkflowManager Init complete
2021/05/07 09:25:12 [32713] [INFO] Activating jc login window on agent startup
2021/05/07 09:25:12 [32713] [INFO] activated JC login window
2021/05/07 09:25:12 [32713] [INFO] Agent Init complete
2021/05/07 09:25:12 [32713] [INFO] Agent Start
2021/05/07 09:25:12 [32713] [INFO] JCClient Start
2021/05/07 09:25:12 [32713] [INFO] CertificateChecker Start
2021/05/07 09:25:12 [32713] [INFO] CertificateChecker Start complete
2021/05/07 09:25:12 [32713] [INFO] JCClient Start complete
2021/05/07 09:25:12 [32713] [INFO] WorkflowManager Start complete
2021/05/07 09:25:12 [32713] [INFO] UserManagement Start
2021/05/07 09:25:12 [32713] [INFO] UserManagement Start complete
2021/05/07 09:25:12 [32713] [INFO] Dispatcher Start
2021/05/07 09:25:12 [32713] [INFO] Dispatcher Start complete
2021/05/07 09:25:12 [32713] [INFO] LocalListener Start
2021/05/07 09:25:12 [32713] [INFO] Attempting to listen to socket at path /tmp/jumpcloud-socket
2021/05/07 09:25:12 [32713] [INFO] softwareapps.manager.loadPersistedSoftwareAppConf() - loaded SoftwareAppConf: {Checksum: Configs[]:}
2021/05/07 09:25:12 [32713] [INFO] Listening to unix socket at /tmp/jumpcloud-socket
2021/05/07 09:25:12 [32713] [INFO] LocalListener Start Complete
2021/05/07 09:25:12 [32713] [INFO] LocalGrpcServer Start
2021/05/07 09:25:12 [32713] [INFO] Attempting to listen to socket at path /tmp/jumpcloud-grpc
2021/05/07 09:25:12 [32713] [INFO] Listening to unix socket at /tmp/jumpcloud-grpc
2021/05/07 09:25:12 [32713] [INFO] LocalGrpcServer Start Complete
2021/05/07 09:25:12 [32713] [INFO] [profiles watcher] starting logstream
2021/05/07 09:25:12 [32713] [INFO] Starting mdmReport reporter
2021/05/07 09:25:12 [32713] [INFO] starting policy manager
2021/05/07 09:25:12 [32713] [INFO] softwareapps.manager.Start() - start
2021/05/07 09:25:12 [32713] [INFO] softwareapps.manager.SendConfigs() - start
2021/05/07 09:25:12 [32713] [INFO] [mdmReport] running report
2021/05/07 09:25:12 [32713] [INFO] softwareapps.manager.SendConfigs() - end
2021/05/07 09:25:12 [32713] [INFO] policies manager received a request to update its policy conf
2021/05/07 09:25:12 [32713] [INFO] requesting policy conf from agent server
2021/05/07 09:25:12 [32713] [INFO] softwareapps.manager.Start() - end
2021/05/07 09:25:12 [32713] [INFO] starting FDE manager
2021/05/07 09:25:12 [32713] [INFO] No Service Account keychain exists, will attempt to retrieve password from the passwordfile
2021/05/07 09:25:12 [32713] [INFO] rotate - Rotating service account password
2021/05/07 09:25:12 [32713] [INFO] [mdmReport:associationToken] could not find mdmReport settings profile 
2021/05/07 09:25:12 [32713] [INFO] Processing user updates
2021/05/07 09:25:13 [32713] [INFO] policies manager received a request to force update policies
2021/05/07 09:25:13 [32713] [INFO] Incoming Policy Conf:
          Bundle: &{Checksum: URL:}
        Checksum: 
        Policies:
2021/05/07 09:25:13 [32713] [ERROR] skipping update policies: policy conf bundle not valid
2021/05/07 09:25:13 [32713] [INFO] Starting systemreport service
2021/05/07 09:25:13 [32713] [INFO] Agent Start complete
2021/05/07 09:25:13 [32713] [INFO] AgentVersion=0.154.0
2021/05/07 09:25:13 [32713] [INFO] systemreport manager: running system report
2021/05/07 09:25:13 [32713] [INFO] systemreport.reporter: running system report
2021/05/07 09:25:13 [32713] [WARN] failed to read conf from disk on startup: open /opt/jc/systemInsightsConf.json: no such file or directory
2021/05/07 09:25:13 [32713] [INFO] bypassing system insights boot delay
2021/05/07 09:25:13 [32713] [INFO] attempting to install jcosqueryi...
2021/05/07 09:25:13 [32713] [INFO] Processing event PASSWORD_CHANGE with handler Password Change Listener
2021/05/07 09:25:13 [32713] [INFO] Processing adding new users, addUsers=map[]
2021/05/07 09:25:13 [32713] [INFO] Processing user takeovers, takeoverUsers=map[]
2021/05/07 09:25:13 [32713] [INFO] Processing already managed, updateAlreadyManaged=map[]
2021/05/07 09:25:13 [32713] [INFO] Processing expired password users, expiredPasswordUsers=map[]
2021/05/07 09:25:13 [32713] [INFO] Processing disabling users, disableUsers=map[]
2021/05/07 09:25:13 [32713] [INFO] Posting notification to server
2021/05/07 09:25:14 [32713] [INFO] User updates complete
2021/05/07 09:25:14 [32713] [INFO] Finished processing event PASSWORD_CHANGE with handler Password Change Listener
2021/05/07 09:25:14 [32713] [INFO] Processing event PASSWORD_CHANGE with handler Event Logger
2021/05/07 09:25:14 [32713] [INFO] User _jumpcloudserviceaccount changed their password
2021/05/07 09:25:14 [32713] [INFO] Finished processing event PASSWORD_CHANGE with handler Event Logger
2021/05/07 09:25:14 [32713] [INFO] Processing event AUTH_CONF_CHANGED with handler Lockout Handler
2021/05/07 09:25:14 [32713] [INFO] got EOF, shutting down local listener
2021/05/07 09:25:14 [32713] [INFO] Finished processing event AUTH_CONF_CHANGED with handler Lockout Handler
2021/05/07 09:25:14 [32713] [INFO] Processing event AUTH_CONF_CHANGED with handler User Update Handler
2021/05/07 09:25:14 [32713] [INFO] Finished processing event AUTH_CONF_CHANGED with handler User Update Handler
2021/05/07 09:25:14 [32713] [INFO] Processing event AUTH_CONF_CHANGED with handler Event Logger
2021/05/07 09:25:14 [32713] [INFO] AuthConf Changed
2021/05/07 09:25:14 [32713] [INFO] Finished processing event AUTH_CONF_CHANGED with handler Event Logger
2021/05/07 09:25:14 [32713] [ERROR] failed to communicate with osqueryi: exit status 127
2021/05/07 09:25:14 [32713] [INFO] No data available from System Insights
2021/05/07 09:25:14 [32713] [ERROR] systemreport.reporter: error collecting data: error collecting System Insights Data for System Report: failed to communicate with osqueryi: exit status 127
2021/05/07 09:25:14 [32713] [INFO] successfully installed jcosqueryi
2021/05/07 09:25:14 [32713] [ERROR] Unable to determine if service account password is valid. err: &fmt.wrapError{msg:"Could not verify password due to err: Open Directory VerifyPassword err: Credentials could not be verified, username or password is invalid.", err:(*errors.errorString)(0xc000244d30)}
2021/05/07 09:25:14 [32713] [INFO] system insights manager successfully updated its conf
2021/05/07 09:25:15 [32713] [INFO] system insights reporting chrome_extensions on system
2021/05/07 09:25:15 [32713] [ERROR] Unable to determine if new service account password is valid. err: &fmt.wrapError{msg:"Could not verify password due to err: Open Directory VerifyPassword err: Credentials could not be verified, username or password is invalid.", err:(*errors.errorString)(0xc0005ec670)}
2021/05/07 09:25:15 [32713] [INFO] systemreport: posting report to server
2021/05/07 09:25:15 [32713] [INFO] system insights reporting etc_hosts on system
2021/05/07 09:25:16 [32713] [INFO] system insights reporting groups on system
2021/05/07 09:25:16 [32713] [INFO] system insights reporting interface_addresses on system
2021/05/07 09:25:17 [32713] [INFO] system insights reporting interface_details on system
2021/05/07 09:25:17 [32713] [INFO] system insights reporting kernel_info on system
2021/05/07 09:25:17 [32713] [INFO] system insights reporting logged_in_users on system
2021/05/07 09:25:17 [32713] [INFO] policies manager received a request to update its policy conf
2021/05/07 09:25:17 [32713] [INFO] requesting policy conf from agent server
2021/05/07 09:25:18 [32713] [INFO] policies manager received a request to force update policies
2021/05/07 09:25:18 [32713] [INFO] Incoming Policy Conf:
          Bundle: &{Checksum:62bb71bb80b251b611408099da5ba78a URL:https://s3.amazonaws.com/jumpcloud-media/policies/v2.19.3/jumpcloud-policies-darwin-v2.19.3.tgz}
        Checksum: 065b04c7a8657dfecb70f90aedd2493685210091fbc7fa39006e737ffe236d21
        Policies:
2021/05/07 09:25:18 [32713] [INFO] updating policies with: force=true, valid=false
2021/05/07 09:25:18 [32713] [INFO] system insights reporting os_version on system
2021/05/07 09:25:18 [32713] [ERROR] error when closing file /opt/jc/policies/jumpcloud-policies.tgz: close /opt/jc/policies/jumpcloud-policies.tgz: file already closed
2021/05/07 09:25:18 [32713] [INFO] downloaded policies bundle: https://s3.amazonaws.com/jumpcloud-media/policies/v2.19.3/jumpcloud-policies-darwin-v2.19.3.tgz
2021/05/07 09:25:18 [32713] [INFO] updated in memory policy conf with incoming conf
2021/05/07 09:25:18 [32713] [INFO] wrote incoming conf to disk
2021/05/07 09:25:18 [32713] [INFO] system insights reporting python_packages on system
2021/05/07 09:25:18 [32713] [INFO] system insights reporting system_info on system
2021/05/07 09:25:24 [32713] [INFO] system insights reporting uptime on system
2021/05/07 09:25:24 [32713] [INFO] system insights reporting user_groups on system
2021/05/07 09:25:25 [32713] [INFO] system insights reporting alf on system
2021/05/07 09:25:25 [32713] [INFO] system insights reporting alf_exceptions on system
2021/05/07 09:25:25 [32713] [INFO] system insights reporting alf_explicit_auths on system
2021/05/07 09:25:25 [32713] [INFO] system insights reporting apps on system
2021/05/07 09:25:27 [32713] [INFO] system insights reporting authorized_keys on system
2021/05/07 09:25:27 [32713] [INFO] system insights reporting battery on system
2021/05/07 09:25:28 [32713] [INFO] system insights reporting browser_plugins on system
2021/05/07 09:25:28 [32713] [INFO] system insights reporting certificates on system
2021/05/07 09:25:29 [32713] [INFO] system insights reporting crashes on system
2021/05/07 09:25:30 [32713] [INFO] system insights reporting cups_destinations on system
2021/05/07 09:25:30 [32713] [INFO] system insights reporting disk_encryption on system
2021/05/07 09:25:31 [32713] [INFO] system insights reporting dns_resolvers on system
2021/05/07 09:25:31 [32713] [INFO] system insights reporting firefox_addons on system
2021/05/07 09:25:32 [32713] [INFO] system insights reporting launchd on system
2021/05/07 09:25:33 [32713] [INFO] system insights reporting managed_policies on system
2021/05/07 09:25:33 [32713] [INFO] system insights reporting mounts on system
2021/05/07 09:25:34 [32713] [INFO] system insights reporting safari_extensions on system
2021/05/07 09:25:34 [32713] [INFO] system insights reporting shared_folders on system
2021/05/07 09:25:34 [32713] [INFO] system insights reporting sharing_preferences on system
2021/05/07 09:25:35 [32713] [INFO] system insights reporting sip_config on system
2021/05/07 09:25:35 [32713] [INFO] system insights reporting startup_items on system
2021/05/07 09:25:36 [32713] [INFO] system insights reporting system_controls on system
2021/05/07 09:25:36 [32713] [INFO] system insights reporting usb_devices on system
2021/05/07 09:25:37 [32713] [INFO] system insights reporting user_ssh_keys on system
2021/05/07 09:25:37 [32713] [INFO] system insights reporting wifi_networks on system
2021/05/07 09:25:38 [32713] [INFO] system insights reporting wifi_status on system
2021/05/07 09:25:42 [32713] [INFO] system insights reporting users on system
2021/05/07 09:55:12 [32713] [INFO] softwareapps.manager.SendConfigs() - start
2021/05/07 09:55:12 [32713] [INFO] softwareapps.manager.SendConfigs() - end
2021/05/07 09:55:13 [32713] [INFO] [mdmReport] running report
2021/05/07 10:12:11 [32713] [INFO] Processing user updates
2021/05/07 10:12:11 [32713] [INFO] Processing adding new users, addUsers=map[]
2021/05/07 10:12:11 [32713] [INFO] Processing user takeovers, takeoverUsers=map[]
2021/05/07 10:12:11 [32713] [INFO] Processing already managed, updateAlreadyManaged=map[]
2021/05/07 10:12:11 [32713] [INFO] Processing expired password users, expiredPasswordUsers=map[]
2021/05/07 10:12:11 [32713] [INFO] Processing disabling users, disableUsers=map[]
2021/05/07 10:12:11 [32713] [INFO] Posting notification to server
2021/05/07 10:12:11 [32713] [INFO] User updates complete
2021/05/07 10:12:11 [32713] [INFO] Processing event AUTH_CONF_CHANGED with handler Lockout Handler
2021/05/07 10:12:11 [32713] [INFO] Finished processing event AUTH_CONF_CHANGED with handler Lockout Handler
2021/05/07 10:12:11 [32713] [INFO] Processing event AUTH_CONF_CHANGED with handler User Update Handler
2021/05/07 10:12:11 [32713] [INFO] Finished processing event AUTH_CONF_CHANGED with handler User Update Handler
2021/05/07 10:12:11 [32713] [INFO] Processing event AUTH_CONF_CHANGED with handler Event Logger
2021/05/07 10:12:11 [32713] [INFO] AuthConf Changed
2021/05/07 10:12:11 [32713] [INFO] Finished processing event AUTH_CONF_CHANGED with handler Event Logger
2021/05/07 10:18:07 [32713] [INFO] Loaded configuration for agent 60955bd85391761889143a21
2021/05/07 10:25:13 [32713] [INFO] softwareapps.manager.SendConfigs() - start
2021/05/07 10:25:13 [32713] [INFO] softwareapps.manager.SendConfigs() - end
2021/05/07 10:25:13 [32713] [INFO] [mdmReport] running report
2021/05/07 10:25:42 [32713] [INFO] system insights manager successfully updated its conf
2021/05/07 10:25:42 [32713] [INFO] system insights reporting chrome_extensions on system
2021/05/07 10:25:43 [32713] [INFO] system insights reporting etc_hosts on system
2021/05/07 10:25:43 [32713] [INFO] system insights reporting groups on system
2021/05/07 10:25:44 [32713] [INFO] system insights reporting interface_addresses on system
2021/05/07 10:25:44 [32713] [INFO] system insights reporting interface_details on system
2021/05/07 10:25:45 [32713] [INFO] system insights reporting kernel_info on system
2021/05/07 10:25:45 [32713] [INFO] system insights reporting logged_in_users on system
2021/05/07 10:25:45 [32713] [INFO] system insights reporting os_version on system
2021/05/07 10:25:45 [32713] [INFO] system insights reporting python_packages on system
2021/05/07 10:25:46 [32713] [INFO] system insights reporting system_info on system
2021/05/07 10:25:51 [32713] [INFO] system insights reporting uptime on system
2021/05/07 10:25:51 [32713] [INFO] system insights reporting user_groups on system
2021/05/07 10:25:52 [32713] [INFO] system insights reporting alf on system
2021/05/07 10:25:52 [32713] [INFO] system insights reporting alf_exceptions on system
2021/05/07 10:25:53 [32713] [INFO] system insights reporting alf_explicit_auths on system
2021/05/07 10:25:53 [32713] [INFO] system insights reporting apps on system
2021/05/07 10:25:54 [32713] [INFO] system insights reporting authorized_keys on system
2021/05/07 10:25:55 [32713] [INFO] system insights reporting battery on system
2021/05/07 10:25:55 [32713] [INFO] system insights reporting browser_plugins on system
2021/05/07 10:25:56 [32713] [INFO] system insights reporting certificates on system
2021/05/07 10:25:57 [32713] [INFO] system insights reporting crashes on system
2021/05/07 10:25:57 [32713] [INFO] system insights reporting cups_destinations on system
2021/05/07 10:25:58 [32713] [INFO] system insights reporting disk_encryption on system
2021/05/07 10:25:58 [32713] [INFO] system insights reporting dns_resolvers on system
2021/05/07 10:25:59 [32713] [INFO] system insights reporting firefox_addons on system
2021/05/07 10:25:59 [32713] [INFO] system insights reporting launchd on system
2021/05/07 10:26:00 [32713] [INFO] system insights reporting managed_policies on system
2021/05/07 10:26:01 [32713] [INFO] system insights reporting mounts on system
2021/05/07 10:26:01 [32713] [INFO] system insights reporting safari_extensions on system
2021/05/07 10:26:02 [32713] [INFO] system insights reporting shared_folders on system
2021/05/07 10:26:02 [32713] [INFO] system insights reporting sharing_preferences on system
2021/05/07 10:26:02 [32713] [INFO] system insights reporting sip_config on system
2021/05/07 10:26:03 [32713] [INFO] system insights reporting startup_items on system
2021/05/07 10:26:03 [32713] [INFO] system insights reporting system_controls on system
2021/05/07 10:26:04 [32713] [INFO] system insights reporting usb_devices on system
2021/05/07 10:26:04 [32713] [INFO] system insights reporting user_ssh_keys on system
2021/05/07 10:26:05 [32713] [INFO] system insights reporting wifi_networks on system
2021/05/07 10:26:05 [32713] [INFO] system insights reporting wifi_status on system
2021/05/07 10:26:05 [32713] [INFO] system insights reporting users on system
2021/05/07 10:26:38 [32713] [INFO] Processing user updates
2021/05/07 10:26:38 [32713] [INFO] Processing adding new users, addUsers=map[]
2021/05/07 10:26:38 [32713] [INFO] Processing user takeovers, takeoverUsers=map[]
2021/05/07 10:26:38 [32713] [INFO] Processing already managed, updateAlreadyManaged=map[]
2021/05/07 10:26:38 [32713] [INFO] Processing expired password users, expiredPasswordUsers=map[]
2021/05/07 10:26:38 [32713] [INFO] Processing disabling users, disableUsers=map[]
2021/05/07 10:26:38 [32713] [INFO] Posting notification to server
2021/05/07 10:26:38 [32713] [INFO] User updates complete
2021/05/07 10:26:38 [32713] [INFO] Processing event AUTH_CONF_CHANGED with handler Lockout Handler
2021/05/07 10:26:38 [32713] [INFO] Finished processing event AUTH_CONF_CHANGED with handler Lockout Handler
2021/05/07 10:26:38 [32713] [INFO] Processing event AUTH_CONF_CHANGED with handler User Update Handler
2021/05/07 10:26:38 [32713] [INFO] Finished processing event AUTH_CONF_CHANGED with handler User Update Handler
2021/05/07 10:26:38 [32713] [INFO] Processing event AUTH_CONF_CHANGED with handler Event Logger
2021/05/07 10:26:38 [32713] [INFO] AuthConf Changed
2021/05/07 10:26:38 [32713] [INFO] Finished processing event AUTH_CONF_CHANGED with handler Event Logger
2021/05/07 10:55:13 [32713] [INFO] softwareapps.manager.SendConfigs() - start
2021/05/07 10:55:13 [32713] [INFO] softwareapps.manager.SendConfigs() - end
2021/05/07 10:55:14 [32713] [INFO] [mdmReport] running report
2021/05/07 11:09:15 [32713] [INFO] Processing user updates
2021/05/07 11:09:16 [32713] [INFO] Processing adding new users, addUsers=map[dylanbabaloo:0xc00021e240]
2021/05/07 11:09:16 [32713] [WARN] Failed to get existing ShadowHashData, will overwrite: Could not find attribute dsAttrTypeNative:ShadowHashData in OD Record: 
2021/05/07 11:09:16 [32713] [INFO] Modified permissions for directory /Users/dylanbabaloo/Music
2021/05/07 11:09:16 [32713] [INFO] Modified permissions for directory /Users/dylanbabaloo/Pictures
2021/05/07 11:09:16 [32713] [INFO] Modified permissions for directory /Users/dylanbabaloo/Desktop
2021/05/07 11:09:16 [32713] [INFO] Modified permissions for directory /Users/dylanbabaloo/Library
2021/05/07 11:09:16 [32713] [INFO] Modified permissions for directory /Users/dylanbabaloo/Public
2021/05/07 11:09:16 [32713] [INFO] Modified permissions for directory /Users/dylanbabaloo/Movies
2021/05/07 11:09:16 [32713] [INFO] Modified permissions for directory /Users/dylanbabaloo/Documents
2021/05/07 11:09:16 [32713] [INFO] Modified permissions for directory /Users/dylanbabaloo/Downloads
2021/05/07 11:09:16 [32713] [INFO] Processing user takeovers, takeoverUsers=map[]
2021/05/07 11:09:16 [32713] [INFO] Processing already managed, updateAlreadyManaged=map[]
2021/05/07 11:09:16 [32713] [INFO] Processing expired password users, expiredPasswordUsers=map[]
2021/05/07 11:09:16 [32713] [INFO] Processing disabling users, disableUsers=map[]
2021/05/07 11:09:16 [32713] [INFO] Posting notification to server
2021/05/07 11:09:16 [32713] [INFO] User updates complete
2021/05/07 11:09:16 [32713] [INFO] Processing event AUTH_CONF_CHANGED with handler Lockout Handler
2021/05/07 11:09:16 [32713] [INFO] Finished processing event AUTH_CONF_CHANGED with handler Lockout Handler
2021/05/07 11:09:16 [32713] [INFO] Processing event AUTH_CONF_CHANGED with handler User Update Handler
2021/05/07 11:09:16 [32713] [INFO] Finished processing event AUTH_CONF_CHANGED with handler User Update Handler
2021/05/07 11:09:16 [32713] [INFO] Processing event AUTH_CONF_CHANGED with handler Event Logger
2021/05/07 11:09:16 [32713] [INFO] AuthConf Changed
2021/05/07 11:09:16 [32713] [INFO] Finished processing event AUTH_CONF_CHANGED with handler Event Logger
2021/05/07 11:23:32 [32713] [INFO] Loaded configuration for agent 60955bd85391761889143a21
2021/05/07 11:24:27 [32713] [INFO] Loaded configuration for agent 60955bd85391761889143a21
2021/05/07 11:25:07 [32713] [INFO] got EOF, shutting down local listener
2021/05/07 11:25:13 [32713] [INFO] softwareapps.manager.SendConfigs() - start
2021/05/07 11:25:13 [32713] [INFO] softwareapps.manager.SendConfigs() - end
2021/05/07 11:25:14 [32713] [INFO] [mdmReport] running report
2021/05/07 11:25:15 [32713] [INFO] systemreport manager: running system report
2021/05/07 11:25:15 [32713] [INFO] systemreport.reporter: running system report
2021/05/07 11:25:20 [32713] [INFO] systemreport: posting report to server
2021/05/07 11:25:37 [32713] [INFO] got EOF, shutting down local listener
2021/05/07 11:26:07 [32713] [INFO] system insights reporting chrome_extensions on system
2021/05/07 11:26:08 [32713] [INFO] system insights reporting etc_hosts on system
2021/05/07 11:26:08 [32713] [INFO] system insights reporting groups on system
2021/05/07 11:26:09 [32713] [INFO] system insights reporting interface_addresses on system
2021/05/07 11:26:09 [32713] [INFO] system insights reporting interface_details on system
2021/05/07 11:26:09 [32713] [INFO] system insights reporting kernel_info on system
2021/05/07 11:26:10 [32713] [INFO] system insights reporting logged_in_users on system
2021/05/07 11:26:10 [32713] [INFO] system insights reporting os_version on system
2021/05/07 11:26:10 [32713] [INFO] system insights reporting python_packages on system
2021/05/07 11:26:11 [32713] [INFO] system insights reporting system_info on system
2021/05/07 11:26:16 [32713] [INFO] system insights reporting uptime on system
2021/05/07 11:26:16 [32713] [INFO] system insights reporting user_groups on system
2021/05/07 11:26:17 [32713] [INFO] system insights reporting alf on system
2021/05/07 11:26:17 [32713] [INFO] system insights reporting alf_exceptions on system
2021/05/07 11:26:17 [32713] [INFO] system insights reporting alf_explicit_auths on system
2021/05/07 11:26:18 [32713] [INFO] system insights reporting apps on system
2021/05/07 11:26:19 [32713] [INFO] system insights reporting authorized_keys on system
2021/05/07 11:26:19 [32713] [INFO] system insights reporting battery on system
2021/05/07 11:26:20 [32713] [INFO] system insights reporting browser_plugins on system
2021/05/07 11:26:20 [32713] [INFO] system insights reporting certificates on system
2021/05/07 11:26:21 [32713] [INFO] system insights reporting crashes on system
2021/05/07 11:26:22 [32713] [INFO] system insights reporting cups_destinations on system
2021/05/07 11:26:22 [32713] [INFO] system insights reporting disk_encryption on system
2021/05/07 11:26:23 [32713] [INFO] system insights reporting dns_resolvers on system
2021/05/07 11:26:23 [32713] [INFO] system insights reporting firefox_addons on system
2021/05/07 11:26:24 [32713] [INFO] system insights reporting launchd on system
2021/05/07 11:26:25 [32713] [INFO] system insights reporting managed_policies on system
2021/05/07 11:26:25 [32713] [INFO] system insights reporting mounts on system
2021/05/07 11:26:25 [32713] [INFO] system insights reporting safari_extensions on system
2021/05/07 11:26:26 [32713] [INFO] system insights reporting shared_folders on system
2021/05/07 11:26:26 [32713] [INFO] system insights reporting sharing_preferences on system
2021/05/07 11:26:26 [32713] [INFO] system insights reporting sip_config on system
2021/05/07 11:26:27 [32713] [INFO] system insights reporting startup_items on system
2021/05/07 11:26:27 [32713] [INFO] system insights reporting system_controls on system
2021/05/07 11:26:28 [32713] [INFO] system insights reporting usb_devices on system
2021/05/07 11:26:28 [32713] [INFO] system insights reporting user_ssh_keys on system
2021/05/07 11:26:29 [32713] [INFO] system insights reporting wifi_networks on system
2021/05/07 11:26:29 [32713] [INFO] system insights reporting wifi_status on system
2021/05/07 11:26:29 [32713] [INFO] system insights reporting users on system
2021/05/07 11:29:02 [32713] [INFO] Processing event LOGIN with handler Audit Manager
2021/05/07 11:29:02 [32713] [INFO] Finished processing event LOGIN with handler Audit Manager
2021/05/07 11:29:02 [32713] [INFO] Processing event LOGIN with handler Lockout Handler
2021/05/07 11:29:02 [32713] [INFO] Finished processing event LOGIN with handler Lockout Handler
2021/05/07 11:29:02 [32713] [INFO] Processing event LOGIN with handler Policies Event Handler
2021/05/07 11:29:02 [32713] [INFO] policies manager received a request to run policies that have a LOGIN monitor type
2021/05/07 11:29:02 [32713] [INFO] enqueued request to run all policies with a LOGIN monitor
2021/05/07 11:29:02 [32713] [INFO] Finished processing event LOGIN with handler Policies Event Handler
2021/05/07 11:29:02 [32713] [INFO] Processing event LOGIN with handler Event Logger
2021/05/07 11:29:02 [32713] [INFO] User dylanconnolly logged in from <nil>, process name: 
2021/05/07 11:29:02 [32713] [INFO] Finished processing event LOGIN with handler Event Logger
2021/05/07 11:35:23 [32713] [INFO] Loaded configuration for agent 60955bd85391761889143a21
2021/05/07 11:37:08 [32713] [INFO] Users Home Directory: /var/root
```

4. Add a SSO (SAML) Connector in the JumpCloud Admin Console  
*Note: You may choose the web-based application of your choice but many applications/services provide free trials and will allow enabling of SAML authentication. For example: Salesforce (Trailhead) or ThousandEyes allow for SAML configurations with free trial accounts.*. 
   - Configure the SAML authentication on the chosen app/service-side
   - Validate one of your users created in Task 1 can login to the application through the user’s JumpCloud portal

    Used Salesforce and followed this [Help Center Article](https://support.jumpcloud.com/support/s/article/single-sign-on-sso-with-salesforce1). Received error and tried walking through process again. Troubleshot for about an hour but ran out of time due to other work obligations. The Salesforce SAML Validator appeared to be highlighting an error `Unable to map the subject to a Salesforce user`
    
   - Create and provide a HAR file of the SAML request
