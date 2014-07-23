class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
    	t.string :content
    	t.float :average_response_time, default: 0
    	t.integer :average_response_counter, default: 0
    	t.string :style
    	t.string :video_filename

      	t.timestamps
    end
  end
end
