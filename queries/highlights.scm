"func" @keyword.function
["return" "var" "let"] @keyword
(builtin_type) @type.builtin
(user_type) @type
(integer_literal) @number
(floating_point_literal) @number.float
(oneline_comment) @comment
(multiline_comment) @comment
(function_definition name: (identifier) @function)
(variable_declaration name: (identifier) @variable)
(variable_reference_expression) @variable
