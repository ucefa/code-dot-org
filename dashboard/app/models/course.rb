# == Schema Information
#
# Table name: courses
#
#  id            :integer          not null, primary key
#  name          :string(255)
#  properties    :text(65535)
#  plc_course_id :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_courses_on_plc_course_id  (plc_course_id)
#

class Course < ApplicationRecord
  # Some Courses will have an associated Plc::Course, most will not
  belongs_to :plc_course, class_name: 'Plc::Course'
end
