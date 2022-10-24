class Message < ApplicationRecord
  scope :pending, -> { where(delivered: false).order(:created_at) }
end
