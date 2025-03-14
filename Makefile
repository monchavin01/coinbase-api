# Coinbase API Commands
get-accounts:
	node coinbase.js accounts

get-order:
	@read -p "Enter order ID: " order_id; \
	node coinbase.js order $$order_id

place-sell:
	@echo "Select product ID:"
	@PS3="Choose product (1-3): "; \
	select product_id in "BTC-USD" "ETH-USD" "USDT-USD"; do \
		if [ -n "$$product_id" ]; then \
			break; \
		fi; \
	done; \
	read -p "Enter size (e.g., 0.001): " size; \
	node coinbase.js sell $$product_id $$size

place-buy:
	@echo "Select product ID:"
	@PS3="Choose product (1-3): "; \
	select product_id in "BTC-USD" "ETH-USD" "USDT-USD"; do \
		if [ -n "$$product_id" ]; then \
			break; \
		fi; \
	done; \
	read -p "Enter size (e.g., 0.001): " size; \
	node coinbase.js buy $$product_id $$size

.PHONY: get-accounts get-order place-sell place-buy
