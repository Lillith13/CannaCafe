from faker import Faker
# from faker.providers import lorem, person
# import faker
import random
# import decimal

fake = Faker()

# fakeName = fake.name()

# fakeNames = []
# * alt list of fake names
# for _ in range(10):
#     fakeNames.append(fake.name())
# fakeNames = [fake.unique.name() for i in range(10)]

# print("fakeName => ", fakeName)
# print("fakeNames list range 10 => ", fakeNames)

# fakeBDay = fake.date_of_birth(minimum_age = 21)
# print("fake dob => ", fakeBDay)

# fakeAddress = fake.address()
# print("fake address (full) => ", fakeAddress)

# bldgNum = fake.building_number()
# print("building num => ", bldgNum)

# city = fake.city()
# print("city => ", city)

# city_suffix = fake.city_suffix()
# print("city suffix => ", city_suffix)

# state = fake.state()
# print("state => ", state)

# * abbreviated state doesn't work :/
# abbreviated = True
# stateAbbr = fake.stateAbbr()
# print("state abbreviated => ", stateAbbr)

# country = fake.country()
# print("country => ", country)

# contryCode = fake.country_code()
# print("countryCode => ", contryCode)

# zipCode = fake.postcode()
# print("zip => ", zipCode)

# streetAddress = fake.street_address()
# print("street address => ", streetAddress)

# streetName = fake.street_name()
# print("street name => ", streetName)

# streetSuffix = fake.street_suffix()
# print("street suffix => ", streetSuffix)

# fakeUsername =
# print("fake username => ", fakeUsername)

# fakeEmail = fake.email()
# print("fake email => ", fakeEmail)

# fakePhoneNum = fake.phone_number().split("x")[0]
# print("fake phone number => ", fakePhoneNum)
"""  , fakePhoneNum[0:] """

# def createMembers():
#     new_users = []
#     for count in range(25):
#         fakeName = fake.name()
#         fakeFirstName = fakeName.split(" ")[0]
#         fakeLastName = fakeName.split(" ")[1]
#         new_user = {
#             "firstName":fakeFirstName,
#             "lastName":fakeLastName,
#             "birthday":fake.date_of_birth(minimum_age=21),
#             "address":fake.street_address(),
#             "city":fake.city(),
#             "state":fake.state(),
#             "zipcode":int(fake.postcode()),
#             "username":f'memberDemo_{count}',
#             "email":fake.email(),
#             "phone" : fake.phone_number().split("x")[0],
#             "password":"password",
#             "role_id":1,
#             "pay_rate":0
#         }
#         print("new user => ", new_user)
#         new_users.append(new_user)
#     return "new users list => ", new_users

# print(createMembers())


# fakeSentence = fake.sentence()
# print(fakeSentence)

# fakeSentences = fake.sentences()
# print(fakeSentences)

# fakeParagraph = fake.paragraph(nb_sentences=10, variable_nb_sentences=True)
# print(fakeParagraph)

# fakeParagraphs = fake.paragraphs()
# print(fakeParagraphs)

# fakeText = fake.text()
# print(fakeText)

randNum = round(float(random.uniform(0.99, 99.99)), 2)
print(randNum)


