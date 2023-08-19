/**
 * @file Enums - MetadataName
 * @module nest-commander/enums/MetadataName
 */

/**
 * Metadata names.
 *
 * @enum {Capitalize<string>}
 */
enum MetadataName {
  COMMAND = 'Command',
  OPTION = 'Option',
  RUNNER = 'Runner',
  SUBCOMMAND = 'Subcommand'
}

export default MetadataName
