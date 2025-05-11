/**
 * @file Garnet grammar for tree-sitter
 * @author ark231
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "garnet",

  rules: {
    source_file: $ => repeat(choice($._definition, $._declaration)),
    _definition: $ => choice(
      $.function_definition,
      $.variable_definition_sentence
    ),
    _declaration: $ => choice(
      $.variable_declaration_sentence
    ),
    function_definition: $ => seq(
      "func",
      field("name", $.identifier),
      field("parameters", $.parameter_list),
      "->",
      field("return_type", $._type),
      field("body", $.block)
    ),
    identifier: $ => /[a-zA-Z][a-zA-Z0-9_]*/,
    parameter_list: $ => seq(
      "(",
      optional(
        seq(
          optional(
            repeat(
              seq(
                $.variable_declaration,
                ","
              )
            ),
          ),
          $.variable_declaration,
        ),
      ),
      ")"
    ),
    _type: $ => choice(
      $.builtin_type,
      $.user_type
    ),
    builtin_type: $ => choice(
      "u8",
      "i8",
      "u16",
      "i16",
      "u32",
      "i32",
      "u64",
      "i64",
      "f32",
      "f64",
    ),
    user_type: $ => $.identifier,
    block: $ => seq(
      "{",
      repeat(
        choice(
          $._sentence,
          $._blocky,
          $.block,
        )
      ),
      "}"
    ),
    _comment: $ => choice(
      $.oneline_comment,
      $.multiline_comment
    ),
    oneline_comment: $ => /#([^*].*)?/,
    // multiline_comment: $ => /#\*([^#]|\n)*?\*#/,
    multiline_comment: $ => /#\*([^*#]|\n|([^*]#)|(\*[^#]))*\*#/,
    _sentence: $ => choice(
      $.expression_sentence,
      $.variable_declaration_sentence,
      $.variable_definition_sentence,
      $.return_sentence,
      $.break_sentence,
      $.assert_sentence
    ),
    expression_sentence: $ => seq($._expression, ";"),
    variable_declaration_sentence: $ => seq($.variable_declaration, ";"),
    variable_definition_sentence: $ => seq($.variable_definition, ";"),
    _callable_expression: $ => choice(
      $.variable_reference_expression,
      $.function_call,
      seq("(", $._callable_expression, ")"),
    ),
    _uncallable_expression: $ => choice(
      $.binary_expresion,
      $.unary_expresion,
      $._literal,
      seq("(", $._uncallable_expression, ")"),
    ),
    _expression: $ => choice(
      $._callable_expression,
      $._uncallable_expression
    ),
    function_call: $ => seq(
      field("callee",$._callable_expression), "(",optional(seq($._expression, repeat(seq(",", $._expression)))) ,")"
    ),
    binary_expresion: $ => choice(
      prec.left(1, seq($._expression, "<", $._expression)),
      prec.left(1, seq($._expression, ">", $._expression)),
      prec.left(1, seq($._expression, "<=", $._expression)),
      prec.left(1, seq($._expression, ">=", $._expression)),
      prec.left(1, seq($._expression, "==", $._expression)),
      prec.left(2, seq($._expression, "=", $._expression)),
      prec.left(2, seq($._expression, "+=", $._expression)),
      prec.left(2, seq($._expression, "-=", $._expression)),
      prec.left(2, seq($._expression, "*=", $._expression)),
      prec.left(2, seq($._expression, "/=", $._expression)),
      prec.left(2, seq($._expression, "%=", $._expression)),
      prec.left(3, seq($._expression, "+", $._expression)),
      prec.left(3, seq($._expression, "-", $._expression)),
      prec.left(4, seq($._expression, "*", $._expression)),
      prec.left(4, seq($._expression, "/", $._expression)),
      prec.left(4, seq($._expression, "%", $._expression)),
    ),
    unary_expresion: $ => choice(
      prec.left(5, seq("+", $._expression)),
      prec.left(5, seq("-", $._expression)),
      prec.left(5, seq("not", $._expression)),
      prec.left(5, seq("!", $._expression)),
      prec.left(5, seq("bit_not", $._expression)),
      prec.left(5, seq("~", $._expression)),
    ),
    _literal: $ => choice(
      $.integer_literal,
      $.floating_point_literal,
      $.string_literal,
      $.boolean_literal,
      $.nil_literal,
    ),
    integer_literal: $ => /\d+/,
    floating_point_literal: $ => /\d+\.\d+/,
    string_literal: $ => /"([^"]|\\")*"/,
    boolean_literal: $ => choice("true", "false"),
    nil_literal: $ => "nil",
    variable_reference_expression: $ => $.identifier,
    variable_declaration: $ => seq(
      choice("var", "let"),
      field("name", $.identifier),
      ":",
      field("type", $._type)
    ),
    variable_definition: $ => seq(
      $.variable_declaration,
      "=",
      $._expression
    ),
    return_sentence: $ => seq(
      "return",
      optional($._expression),
      ";"
    ),
    break_sentence: $ => seq("break", ";"),
    loop_statement: $ => seq(
      "loop",
      $.block
    ),
    if_statement: $ => seq(
      "if",
      "(",
      $._expression,
      ")",
      $.block
    ),
    elif_statement: $ => seq(
      "elif",
      "(",
      $._expression,
      ")",
      $.block
    ),
    else_statement: $ => seq(
      "else",
      $.block
    ),
    for_statement: $ => seq(
      "for",
      "(",
      optional($.variable_definition),
      ";",
      optional($._expression),
      ";",
      optional($._expression),
      ")",
      $.block
    ),
    _blocky: $ => choice(
      $.loop_statement,
      $.if_statement,
      $.elif_statement,
      $.else_statement,
      $.for_statement,
    ),
    assert_sentence: $ => seq(
      "assert",
      $._expression,
      optional(seq(",", $._expression)),
      ";"
    ),
  },
  extras: $ => [/[ ]|\t|(\r?\n)/, $.multiline_comment, $.oneline_comment]
});
