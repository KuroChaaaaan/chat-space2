FactoryBot.define do
  factory :message do
    message {Faker::Lorem.sentence}
    # image {File.open("#{Rails.root}/app/assets/images/")}
    image {File.open("/Users/taishi.k/Desktop/kaiba-man/08732d24be0e649626b91d2e77a40014.jpg")}
    user
    group
  end
end