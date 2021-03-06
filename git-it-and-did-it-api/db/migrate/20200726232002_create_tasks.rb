class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.integer :category
      t.string :description
      t.integer :status
      t.integer :priority
      t.string :assignee
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
