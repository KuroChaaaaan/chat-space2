# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## groups_users table
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user


## users table
|Column|Type|Options|
|------|----|-------|
|name|string|null:false|index: true|
|email|string|null: false|
|password|integer|null: false|


### Association
- has_many :groups_users
- has_many :messages
- has_many :groups, through: :groups_users


## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|


## Association
- has_many :groups_users
- has_many :messages
- has_many :users, through: :groups_users


## messages table
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false|foreign_key: true|
|group_id|references|null: false|foreign_key: true|
|message|text||
|image|text||


## Association
- belongs_to :user
- belongs_to :group