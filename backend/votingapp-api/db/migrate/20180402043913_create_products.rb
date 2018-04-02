class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :title
      t.text :description
      t.integer :votes
      t.string :url
      t.string :submitterAvatarUrl
      t.string :productImageUrl

      t.timestamps
    end
  end
end
