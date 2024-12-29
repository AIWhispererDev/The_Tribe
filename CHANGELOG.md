# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2024-12-30

### Changed
- Refactored game logic from CryptoGorillaGame into dedicated hooks and components

## [0.1.0] - 2024-12-29

### Fixed
- Allow pre-minted gorillas to be evolved
- Handle pre-minted gorillas and improve transaction payload serialization
- Add error handling and type safety to CryptoGorillaGame component
- Properly serialize transaction payload arguments for BCS format

### Changed
- Update transaction payload and add gas parameters in CryptoGorillaGame
- Remove unused code in CryptoGorillaGame component
- Reformat code indentation in CryptoGorillaGame component

## [0.0.9] - 2024-12-28

### Added
- Implement wallet integration with game components

### Fixed
- Fix MotionBox component
- Improve account status check after wallet connection
- Enhance wallet connection for local testing

## [0.0.8] - 2024-12-25

### Added
- Integrate wallet functionality with Nightly Labs
- Implement WalletSelector component
- Create WalletContext for managing wallet state
- Add WalletButton for connection handling
- Update package.json with new wallet dependencies

## [0.0.7] - 2024-12-24

### Added
- Enhance NFT functionality in Move.toml and gorilla_game_module
- Add burn reference to GorillaNFT struct
- Implement initialize_game function for module setup

### Changed
- Improve transaction handling in frontend
- Update Aptos wallet integration
- Adjust environment variables for local development

### Removed
- Remove build files from Git tracking

## [0.0.6] - 2024-12-21

### Added
- Implement burn_gorilla function in GorillaGame module
- Add example .env file for Aptos configuration
- Introduce @tsparticles dependencies
- Add new WalletSelector component for better wallet management

### Changed
- Update .gitignore configuration
- Enhance frontend with new environment configuration
- Refactor CryptoGorillaGame component to use environment variables
- Improve error handling and transaction feedback
- Update App and Header components for improved layout

## [0.0.5] - 2024-12-18

### Added
- Introduce new StatBar for displaying stats
- Add shine animation for shiny cards
- Implement card flipping functionality
- Add progress bar to display score

### Changed
- Enhance GorillaCardV2 component with improved layout and visual presentation
- Update card frame styling and spacing
- Refine energy symbol sizes and text styling
- Introduce Pokemon-style card design option

## [0.0.4] - 2024-12-15

### Added
- Introduce TribalComponents for consistent styling
- Add particle effects using @tsparticles
- Implement transaction feedback system

### Changed
- Replace react-particles with @tsparticles/react
- Enhance UI with improved background styling and animations
- Refactor transaction status messages and toast management

## [0.0.3] - 2024-12-14

### Added
- Implement EvolutionCelebration animation
- Add StageProgress component for evolution stages
- Introduce floating and twinkling animations
- Add transaction feedback system with toast notifications

### Changed
- Enhance GorillaCard with rarity effects
- Improve card flipping animations
- Refactor layout to use Grid for card display
- Update UI structure and responsiveness

## [0.0.2] - 2024-12-13

### Added
- Add QuestCard component
- Integrate new navigation links
- Add features and roadmap sections
- Enhance LandingPage with scroll animations

## [0.0.1] - 2024-12-10

### Added
- Initial project setup
- Add game summary
- Basic frontend implementation

### Changed
- Update .gitignore configuration
