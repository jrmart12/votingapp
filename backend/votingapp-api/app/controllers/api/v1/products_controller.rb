module Api::V1
  class ProductsController < ApplicationController
        def index
			@products = Product.all
			render json: @products 
		end

		def create
			@product = Product.create(product_params)
			render json: @product
		end

		def update
			@product = Product.find(params[:id])
			@product.update_attributes(product_params)
			render json: @product
		end

		def destroy
			@product = Product.find(params[:id])
			if @product.destroy
			  head :no_content, status: :ok
			else
			  render json: @prodcut.errors, status: :unprocessable_entity
			end
		  end

		private

		def product_params
			params.require(:product).permit(:title, :description, :votes, :submitterAvatarUrl,:productImageUrl)
		end

    end
end