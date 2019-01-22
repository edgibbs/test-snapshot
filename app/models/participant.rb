# frozen_string_literal: true

# Model for storing Intake participant information.
class Participant
  include Virtus.model

  attribute :id
  attribute :date_of_birth
  attribute :approximate_age
  attribute :approximate_age_units
  attribute :first_name
  attribute :gender
  attribute :last_name
  attribute :middle_name
  attribute :ssn
  attribute :sealed, Boolean, default: false
  attribute :sensitive, Boolean, default: false
  attribute :name_suffix
  attribute :phone_numbers, Array[PhoneNumber]
  attribute :addresses, Array[Address]
  attribute :legacy_id
  attribute :legacy_source_table
  attribute :screening_id
  attribute :roles, Array[String]
  attribute :languages, Array
  attribute :races, Array[Race]
  attribute :ethnicity, Array[Ethnicity]
  attribute :legacy_descriptor, LegacyDescriptor
  attribute :safely_surrendered_babies, SafelySurrenderedBabies
  attribute :csec_started_at
  attribute :csec_ended_at
  attribute :csec_types, Array[String]
end
